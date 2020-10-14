import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import torchvision
import torchvision.models as models
from torch.utils.data import random_split
import torchvision.transforms as transforms
import matplotlib.pyplot as plt
import random
import time
import os
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt
import torchvision.models as models
import cv2
from PIL import Image
class Classifier(nn.Module):
    def __init__(self):
        super(Classifier, self).__init__()
        self.name = 'classifier'
        self.fc1 = nn.Linear(1000, 5000)
        self.fc2 = nn.Linear(5000, 320)
        self.fc3 = nn.Linear(320, 1)

    def forward(self, x):
        x = x.view(-1, 1000)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        X = F.sigmoid(x)
        x = x.squeeze(1)
        return x
classifier = Classifier()
device = torch.device('cpu')
filename1 = "./classification_res.pt"
filename2 = "./classification_class.pt"
res = models.resnet18()
res = torch.load(filename1,map_location=device)
classifier = torch.load(filename2,map_location=device)

def getresult(image,labels):
    output = classifier(res(image))
    pred = (output > 0.0).squeeze().long()
    classes = ['Positive',"Negative"]
    print(("True Lable:{} \n Prediction: {}").format(classes[labels],classes[pred]))
    return True
def main():
    img = cv2.imread('./study_0255_z029.png')
    img = Image.fromarray(img)
    #img = img.transforms.ToTensor()
    transform_classify = transforms.Compose([transforms.Resize(256),transforms.CenterCrop(224),transforms.ToTensor(),transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])])
    image = transform_classify(img)
    image = image.unsqueeze(0)
    getresult(image,1)
    return True



main()