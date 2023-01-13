# Generated by Django 4.1.5 on 2023-01-07 06:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('PurchaseDate', models.DateTimeField(auto_created=True)),
                ('ProductName', models.CharField(max_length=50)),
                ('ProductSize', models.IntegerField()),
                ('ProductPrice', models.IntegerField()),
                ('ProductQuantity', models.IntegerField()),
            ],
        ),
    ]
