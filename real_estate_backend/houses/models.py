from django.db import models

# Create your models here.
class House(models.Model):
 title = models.CharField(max_length=200)
 description = models.TextField()
 price = models.DecimalField(max_digits=10, decimal_places=2)
 location = models.CharField(max_length=200)
 seller_name = models.CharField(max_length=100)
 date_posted = models.DateTimeField(auto_now_add=True)
 
 def __str__(self):
     return f"{self.title} - {self.location}"
