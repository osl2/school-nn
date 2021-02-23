from django.contrib.auth.views import LogoutView
from django.urls import path

from .training import TrainingManager
from .views.architectureview import (
    ArchitectureCreateView,
    ArchitectureDeleteView,
    ArchitectureEditView,
    ArchitectureListView,
    ArchitectureDetailView,
    ArchitectureEditorView,
)
from .views.training import (
    TrainingCreateView,
    TrainingDetailView,
    TrainingDeleteView,
    TrainingListView,
    TrainingStopView,
    TrainingCompareView,
)
from .views.auth import AuthLoginView
from .views.datasets import DatasetCreate, DatasetList
from .views.datasets import DatasetDetail, DatasetUpdate, DatasetDelete
from .views.images import ImageView
from .views.base_view import BaseView
from .views.inference import InferenceView
from .views.projects import (
    ProjectCreateView,
    ProjectListView,
    ProjectDetailView,
    ProjectEditView,
    ProjectDeleteView,
)

TrainingManager()  # runs once, starts unfinished trainings

urlpatterns = [
    path("", BaseView.as_view(), name="home"),
    path("datasets/list/", DatasetList.as_view(), name="dataset-list"),
    path(
        "datasets/list/<str:listing_type>/",
        DatasetList.as_view(),
        name="dataset-list",
    ),
    path("datasets/<int:pk>/", DatasetDetail.as_view(), name="dataset-detail"),
    path("datasets/add/", DatasetCreate.as_view(), name="dataset-add"),
    path(
        "datasets/<int:pk>/edit/", DatasetUpdate.as_view(), name="dataset-edit"
    ),
    path(
        "datasets/<int:pk>/delete/",
        DatasetDelete.as_view(),
        name="dataset-delete",
    ),
    path("images/<int:pk>", ImageView.as_view(), name="image-show"),
    path(
        "architectures/",
        ArchitectureListView.as_view(),
        name="architecture-list",
    ),
    path(
        "architectures/<int:pk>/",
        ArchitectureDetailView.as_view(),
        name="architecture-detail",
    ),
    path(
        "architectures/<int:pk>/delete/",
        ArchitectureDeleteView.as_view(),
        name="architecture-delete",
    ),
    path(
        "architectures/<int:pk>/edit/",
        ArchitectureEditView.as_view(),
        name="architecture-edit",
    ),
    path(
        "architectures/add/",
        ArchitectureCreateView.as_view(),
        name="architecture-create",
    ),
    path(
        "architectures/<int:pk>/editor/",
        ArchitectureEditorView.as_view(),
        name="architecture-editor",
    ),
    path(
        "project/<int:project_pk>/training/create",
        TrainingCreateView.as_view(),
        name="create-training",
    ),
    path(
        "project/<int:project_pk>/training/<int:training_pk>",
        TrainingDetailView.as_view(),
        name="show-training",
    ),
    path(
        "project/<int:project_pk>/training/compare",
        TrainingCompareView.as_view(),
        name="compare-training",
    ),
    path(
        "project/<int:project_pk>/training/<int:training_pk>/inference",
        InferenceView.as_view(),
        name="inference",
    ),
    path(
        "project/<int:project_pk>/training/<int:training_pk>/delete",
        TrainingDeleteView.as_view(),
        name="delete-training",
    ),
    path(
        "project/<int:project_pk>/training/<int:training_pk>/stop",
        TrainingStopView.as_view(),
        name="stop-training",
    ),
    path(
        "project/<int:project_pk>/training",
        TrainingListView.as_view(),
        name="show-trainings",
    ),
    path(
        "login/",
        AuthLoginView.as_view(),
        name="auth-login",
    ),
    path("logout/", LogoutView.as_view(), name="auth-logout"),
]

# Project routes
urlpatterns += [
    path("project/", ProjectListView.as_view(), name="project-list"),
    path(
        "project/create/", ProjectCreateView.as_view(), name="project-create"
    ),
    path(
        "project/<int:pk>/",
        ProjectDetailView.as_view(),
        name="project-details",
    ),
    path(
        "project/<int:pk>/edit/",
        ProjectEditView.as_view(),
        name="project-edit-settings",
    ),
    path(
        "project/<int:pk>/edit/dataset/",
        ProjectEditView.as_view(),
        name="project-edit-dataset",
    ),
    path(
        "project/<int:pk>/edit/architecture/",
        ProjectEditView.as_view(),
        name="project-edit-architecture",
    ),
    path(
        "project/<int:pk>/edit/architecture/load/",
        ProjectEditView.as_view(),
        name="project-edit-load_architecture",
    ),
    path(
        "project/<int:pk>/edit/parameters/",
        ProjectEditView.as_view(),
        name="project-edit-parameters",
    ),
    path(
        "project/<int:pk>/delete",
        ProjectDeleteView.as_view(),
        name="project-delete",
    ),
]
