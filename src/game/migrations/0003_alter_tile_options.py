# Generated by Django 3.2.7 on 2021-09-21 10:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_auto_20210921_0405'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tile',
            options={'ordering': ['team', 'title'], 'verbose_name': '타일', 'verbose_name_plural': '타일들'},
        ),
    ]