# where the my-todo-app.pem is located in my local machine
# before CI/CD era
ssh -t -i my-todo-app.pem ubuntu@ec2-13-234-38-7.ap-south-1.compute.amazonaws.com 
"sudo bash ~/deploy.sh"
