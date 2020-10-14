from setuptools import setup

setup(
   name='Covid-19 Detector',
   version='0.1.0',
   description='The covid-19 lung ct scan classification model and segmentation model using deep CNN',
   author='Stack Underflow',
   install_requires=[
    'numpy', 
    'torch',
    'torchvision',
    'matplotlib',
    'sklearn',
    'IPython',
    ], #external packages as dependencies
)
