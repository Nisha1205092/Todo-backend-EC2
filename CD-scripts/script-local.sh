# where the my-todo-app.pem is located in my local machine
# before CI/CD era
ssh -t -i my-todo-app.pem ubuntu@ec2-15-206-92-147.ap-south-1.compute.amazonaws.com 
"sudo bash ~/deploy.sh"
