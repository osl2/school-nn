import json
from typing import Optional

from django import forms
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse_lazy, resolve
from django.views import View
from django.views.generic import DetailView, CreateView, ListView, DeleteView

from schoolnn.models import Project, Dataset, Architecture, TrainingParameter
from schoolnn.resources.static.layer_list import layer_list


class ProjectCreateView(CreateView):
    """Responsible for the creation of projects."""

    class ProjectCreateForm(forms.ModelForm):
        class Meta:
            fields = ["name"]
            model = Project

    form_class = ProjectCreateForm
    template_name = "project/create_project.html"

    object: Optional[Project] = None

    def form_valid(self, form: ProjectCreateForm):
        """If the form is valid, save the associated model."""
        self.object = form.save()

        if self.object is None:
            # TODO: Translation für Fehlermeldung
            raise ValueError("Failed to parse the project create form")

        # Create and assign anonymous architecture
        new_architecture = Architecture()
        new_architecture.save()

        self.object.architecture = new_architecture
        self.object.save()

        messages.success(
            self.request, f"Projekt „{self.object.name}“ erfolgreich erstellt."
        )

        return HttpResponseRedirect(self.get_success_url())


class ProjectListView(ListView):
    """Responsible for listing all projects."""

    queryset = Project.objects.order_by("-created_at")
    context_object_name = "projects"
    template_name = "project/project_overview.html"


class ProjectDetailView(DetailView):
    """Responsible for displaying a single project."""

    model = Project
    template_name = "project/project_details.html"


class ProjectEditView(View):
    """Responsible for editing all the data of a project."""

    template_name: str = "project/edit_project.html"
    valid_steps: list = [
        "settings",
        "dataset",
        "architecture",
        "load_architecture",
        "parameters",
    ]

    def get(self, request, *args, **kwargs):
        self._setup()

        return render(request, self.template_name, self.context)

    def post(self, request, *args, **kwargs):
        self._setup()

        if self.step == "settings":
            post_redirect = self._handle_settings_form()
        elif self.step == "dataset":
            post_redirect = self._handle_dataset_load_form()
        elif self.step == "load_architecture":
            post_redirect = self._handle_architecture_load_form()
        elif self.step == "architecture":
            post_redirect = self._handle_architecture_form()
        elif self.step == "parameters":
            post_redirect = self._handle_parameters_form()
        else:
            messages.error(self.request, "Invalider Projekt-Editier-Schritt.")
            post_redirect = self.default_redirect

        self.project.save()

        return post_redirect

    def _setup(self):
        self.default_redirect = redirect("project-details", self.kwargs["pk"])
        self.step = self._get_step()
        self.project = self._get_project()
        self._set_context()

    # project-edit-dataset -> dataset
    def _get_step(self):
        url_name = resolve(self.request.path_info).url_name
        step = url_name.split("-")[-1]

        if step not in self.valid_steps:
            raise ValueError("Invalid project edit step.")

        return step

    def _get_project(self):
        return Project.objects.get(pk=self.kwargs["pk"])

    def _set_context(self):
        self.context = {"step": self.step, "project": self.project}
        self.context = {**self.context, **self._get_step_context()}

    def _get_step_context(self):
        if self.step == "dataset":
            return {"datasets": Dataset.objects.all()}
        elif self.step == "architecture":
            return {
                "layer_list": layer_list,
                "architecture_json": json.dumps(
                    self.project.architecture.architecture_json
                ),
            }
        elif self.step == "load_architecture":
            return {
                "architectures": Architecture.objects.exclude(custom=False)
            }
        elif self.step == "parameters":
            params = TrainingParameter.from_json(
                json.dumps(self.project.training_parameter_json)
            )

            return {
                "parameters": params,
                "parameter_form": TrainingParameterForm(
                    initial={
                        "validation_split": params.validation_split,
                        "learning_rate": params.learning_rate,
                        "termination_condition_seconds":
                            params.termination_condition.seconds,
                        "termination_condition_epochs":
                            params.termination_condition.epochs,
                        "batch_size": params.batch_size,
                        "loss_function": params.loss_function.value,
                        "optimizer": params.optimizer.value,
                        "augmentation_channel_shuffle":
                            params.augmentation_options.channel_shuffle,
                        "augmentation_brightness":
                            params.augmentation_options.brightness,
                        "augmentation_gaussian_noise":
                            params.augmentation_options.gaussian_noise,
                        "augmentation_dropout_boxes":
                            params.augmentation_options.dropout_boxes,
                        "augmentation_salt_and_pepper":
                            params.augmentation_options.salt_and_pepper,
                        "augmentation_jpeg_artifacts":
                            params.augmentation_options.jpeg_artifacts,
                        "augmentation_vertical_flip":
                            params.augmentation_options.vertical_flip,
                        "augmentation_distortion":
                            params.augmentation_options.distortion,
                        "augmentation_rotate":
                            params.augmentation_options.rotate,
                        "augmentation_scale_translate":
                            params.augmentation_options.scale_and_translate,
                        "augmentation_color":
                            params.augmentation_options.color,
                    }
                ),
            }
        else:
            return {}

    def _handle_settings_form(self):
        name = self.request.POST.get("name", None)

        if name is None:
            messages.error(self.request, "Projektname nicht angegeben.")
            return self.default_redirect

        self.project.name = name
        messages.success(self.request, "Projekteinstellungen gespeichert.")

        return self.default_redirect

    #
    def _handle_dataset_load_form(self):
        dataset_id = self.request.POST.get("dataset", None)

        if dataset_id is None:
            raise ValueError("Datensatz-ID nicht angegeben.")

        dataset = Dataset.objects.filter(pk=dataset_id).first()

        if dataset is None:
            messages.error(
                self.request,
                "Der gewählte Datensatz konnte nicht gefunden werden.",
            )
            return self.default_redirect

        self.project.dataset = dataset
        messages.success(
            self.request, f"Datensatz „{dataset.name}“ erfolgreich gewählt."
        )

        return self.default_redirect

    #
    def _handle_architecture_form(self):
        architecture_json = self.request.POST.get("architecture_json", None)

        if architecture_json is None:
            raise ValueError("Architektur-JSON nicht angegeben.")

        # Todo: Check if json is valid
        self.project.architecture.architecture_json = json.loads(
            architecture_json
        )
        self.project.architecture.save()

        messages.success(
            self.request, "Die Änderungen wurden erfolgreich gespeichert."
        )

        return redirect("project-edit-architecture", self.kwargs["pk"])

    #
    def _handle_architecture_load_form(self):
        architecture_id = self.request.POST.get("custom_architecture", None)

        if architecture_id is None:
            raise ValueError("Architektur-ID nicht angegeben.")

        architecture = Architecture.objects.filter(pk=architecture_id).first()

        if architecture is None:
            messages.error(
                self.request,
                "Die gewählte Architektur konnte nicht gefunden werden.",
            )
            return redirect("project-edit-architecture", self.kwargs["pk"])

        # Duplicate selected architecture
        architecture.pk = None
        architecture.custom = False
        architecture_name = architecture.name
        architecture.name = f"Copy of {architecture_name}"
        architecture.save()

        # Delete old architecture and replace with new one
        self.project.architecture.delete()
        self.project.architecture = architecture
        messages.success(
            self.request,
            f"Architektur „{architecture_name}“ erfolgreich geladen.",
        )

        return redirect("project-edit-architecture", self.kwargs["pk"])

    def _handle_parameters_form(self):
        # Todo: Check if json is valid

        return redirect("project-details", self.kwargs["pk"])


class TrainingParameterForm(forms.Form):
    fieldsets = [
        {
            "headline": "Allgemeine Einstellungen",
            "fields": [
                "validation_split",
                "learning_rate",
                "batch_size",
                "loss_function",
                "optimizer",
            ],
            "id": "general_settings",
        },
        {
            "headline": "Abbruchbedingungen",
            "fields": [
                "termination_condition_seconds",
                "termination_condition_epochs",
            ],
            "id": "termination_settings",
        },
        {
            "headline": "Augmentierungs-Einstellungen",
            "fields": [
                "augmentation_channel_shuffle",
                "augmentation_brightness",
                "augmentation_gaussian_noise",
                "augmentation_dropout_boxes",
                "augmentation_salt_and_pepper",
                "augmentation_jpeg_artifacts",
                "augmentation_vertical_flip",
                "augmentation_distortion",
                "augmentation_rotate",
                "augmentation_scale_and_translate",
                "augmentation_color",
            ],
            "id": "augmentation_settings",
        },
    ]

    validation_split = forms.FloatField(
        label="Validierungs-Anteil",
        min_value=0.0,
        max_value=0.5,
        # widget=NumberInput(attrs={
        #     "type": "range",
        #     "oninput": "updateTextInput(this.value);"
        # })
    )

    learning_rate = forms.FloatField(
        label="Lernrate", min_value=0.001, max_value=0.2
    )

    termination_condition_seconds = forms.IntegerField(
        label="Vergangene Sekunden seit Trainingsbeginn",
        min_value=1,
        max_value=86400,
    )

    termination_condition_epochs = forms.IntegerField(
        label="Anzahl der Epochen", min_value=1, max_value=128
    )

    batch_size = forms.IntegerField(
        label="Batchgröße", min_value=1, max_value=128
    )

    # Todo: Build choices by calling LossFunction.to_array()
    loss_function = forms.ChoiceField(
        label="Loss-Funktion",
        choices=[("categorical_crossentropy", "Categorical Crossentropy")],
    )

    # Todo: Build choices by calling Optimizer.to_array()
    optimizer = forms.ChoiceField(
        label="Optimierer",
        choices=[
            ("sgd", "Stochastic Gradient Descent"),
            ("rmsprop", "RMSprop"),
            ("adam", "Adam"),
            ("nadam", "NAdam"),
            ("adadelta", "Adadelta"),
            ("adamax", "Adamax"),
        ],
    )

    augmentation_channel_shuffle = forms.BooleanField(label="Channel-Shuffle")

    augmentation_brightness = forms.BooleanField(label="Helligkeit")

    augmentation_gaussian_noise = forms.BooleanField(
        label="Gaußsches Rauschen"
    )

    augmentation_dropout_boxes = forms.BooleanField(label="Dropout-Boxen")

    augmentation_salt_and_pepper = forms.BooleanField(label="Salz und Pfeffer")

    augmentation_jpeg_artifacts = forms.BooleanField(label="JPEG-Artefakte")

    augmentation_vertical_flip = forms.BooleanField(
        label="Vertikale Spiegelung"
    )

    augmentation_distortion = forms.BooleanField(label="Verzerrung")

    augmentation_rotate = forms.BooleanField(label="Rotation")

    augmentation_scale_and_translate = forms.BooleanField(
        label="Skalierung und Verschiebung"
    )

    augmentation_color = forms.BooleanField(label="Farbe")


class ProjectDeleteView(DeleteView):
    """Responsible for deleting all the data of a project."""

    model = Project
    success_url = reverse_lazy("project-list")
    template_name = "project/delete_project.html"
