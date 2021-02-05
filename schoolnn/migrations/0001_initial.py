# Generated by Django 3.1.5 on 2021-01-29 15:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Architecture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('custom', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
                ('custom', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('filename', models.FilePathField()),
                ('dataset_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.dataset')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('custom', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Training_pass',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('start_datetime', models.DurationField()),
                ('end_datetime', models.DurationField()),
                ('training_parameter_json', models.JSONField()),
                ('model_weight', models.BinaryField()),
                ('status', models.CharField(max_length=15)),
                ('architecture_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.architecture')),
                ('dataset_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.dataset')),
                ('project_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.project')),
            ],
        ),
        migrations.CreateModel(
            name='Workspace',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('settings_json', models.JSONField()),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Visiblity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permissions', models.JSONField()),
                ('object_id', models.PositiveIntegerField()),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=50)),
                ('last_login', models.DateTimeField()),
                ('is_active', models.BooleanField(default=False)),
                ('username', models.CharField(max_length=15)),
                ('first_name', models.CharField(max_length=15)),
                ('last_name', models.CharField(max_length=15)),
                ('is_superadmin', models.BooleanField(default=False)),
                ('is_workspaceadmin', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('workspace_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.workspace')),
            ],
        ),
        migrations.CreateModel(
            name='Training_step_metrics',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('metrics_json', models.JSONField()),
                ('traning_pass_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.training_pass')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.user'),
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('object_id', models.PositiveIntegerField()),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
        ),
        migrations.CreateModel(
            name='Label',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('dataset_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.dataset')),
            ],
        ),
        migrations.CreateModel(
            name='Image_label',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.image')),
                ('label_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.label')),
            ],
        ),
        migrations.AddField(
            model_name='dataset',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='schoolnn.user'),
        ),
    ]
