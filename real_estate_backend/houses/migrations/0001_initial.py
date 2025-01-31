# Generated by Django 5.1.5 on 2025-01-16 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='House',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('location', models.CharField(max_length=200)),
                ('seller_name', models.CharField(max_length=100)),
                ('date_posted', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
