"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200



@api.route('/user/login', methods=['POST'])
def login_test():
        
        request_body=request.json
      
        test_user= User.query.filter_by(email=request_body[0]).first().id  
        
        if(test_user):
            test_email= User.query.filter_by(email=request_body[0]).first().email
            test_password= User.query.filter_by(email=request_body[0]).first().password
            

             
            if test_password == request_body[1]:  
                test=[test_user,test_email]   
                #Create a new token with the user id inside
                access_token = create_access_token(identity=test_user)
                return jsonify({ "token": access_token, "user_email": test_email})
            else:
                return jsonify(f"Incorrect email or password")
                 
                       
        else:
              return jsonify(f"Incorrect email or password")




@api.route("/test/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.get(current_user)
    if user :
         return jsonify('Youre good to go', user), 200   
    else:
         return jsonify('something is wrong')
    
    #return jsonify({"id": user.id, "username": user.username }), 200
     


@api.route('/user/new', methods=['POST'])
def add_newuser():
        request_body=request.json
        
        test_user= User.query.filter_by(email=request_body[1]).first()
    
        if(test_user):
             return jsonify(f"User already exists"), 500
        
        else:
             newU=User ( name=request_body[0], email=request_body[1],password= request_body[2] )
             db.session.add(newU)
             db.session.commit()
             return jsonify(f"Success"), 200

