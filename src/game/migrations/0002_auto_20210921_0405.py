# Generated by Django 3.2.7 on 2021-09-20 19:05

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0001_initial'),
        ('game', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Expression',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100, verbose_name='제목')),
                ('is_completed', models.BooleanField(verbose_name='완성 여부')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='expression', to='team.team')),
            ],
            options={
                'verbose_name': '수식',
                'verbose_name_plural': '수식들',
                'ordering': ['team__name', 'is_completed'],
            },
        ),
        migrations.CreateModel(
            name='ExpressionSlot',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('order', models.PositiveSmallIntegerField(default=0)),
                ('expression', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='slot', to='game.expression')),
            ],
            options={
                'verbose_name': '슬롯',
                'verbose_name_plural': '슬롯들',
                'ordering': ['order'],
            },
        ),
        migrations.AlterModelOptions(
            name='tile',
            options={'ordering': ['team'], 'verbose_name': '타일', 'verbose_name_plural': '타일들'},
        ),
        migrations.AddField(
            model_name='tile',
            name='team',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tile', to='team.team'),
        ),
        migrations.DeleteModel(
            name='TileSlot',
        ),
        migrations.AddField(
            model_name='expressionslot',
            name='tile',
            field=models.OneToOneField(blank=True, limit_choices_to={'team__isnull': False}, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='slot', to='game.tile'),
        ),
    ]
