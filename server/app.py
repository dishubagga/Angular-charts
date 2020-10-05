from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)


class Source(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    xPathName = db.Column(db.String)
    name = db.Column(db.String)
    type = db.Column(db.String)
    data = db.Column(db.String)


class SourceSchema(ma.Schema):
    class Meta:
        fields = ('id', 'xPathName', 'name', 'type', 'data')


EmployeeData = [
    {"id": 1, "firstName": "Dishu", "lastName": "Bagga", "address": "Via 41 Arezzo", "gender": "Male", "phoneNumber": "01762236562"},
    {"id": 2, "firstName": "Akash", "lastName": "Bagga", "address": "Via 42 Arezzo", "gender": "Male", "phoneNumber": "04442173222"},
    {"id": 3, "firstName": "Sahil", "lastName": "Bagga", "address": "Via 43 Arezzo", "gender": "Male", "phoneNumber": "01763436562"},
    {"id": 4, "firstName": "Marco", "lastName": "Giannini", "address": "Via 44 Arezzo", "gender": "Male", "phoneNumber": "01762236562"},
    {"id": 5, "firstName": "Allesandro", "lastName": "Eserual", "address": "Via 45 Arezzo", "gender": "Male", "phoneNumber": "04417636562"},
    {"id": 6, "firstName": "Robert", "lastName": "Til", "address": "Via 46 Arezzo", "gender": "Male", "phoneNumber": "01232236562"},
    {"id": 7, "firstName": "Sahil", "lastName": "Bagga", "address": "Via 43 Arezzo", "gender": "Male", "phoneNumber": "01763436562"},
    {"id": 8, "firstName": "Marco", "lastName": "Giannini", "address": "Via 44 Arezzo", "gender": "Male", "phoneNumber": "01762236562"},
    {"id": 9, "firstName": "Allesandro", "lastName": "Eserual", "address": "Via 45 Arezzo", "gender": "Male", "phoneNumber": "04417636562"},
    {"id": 10, "firstName": "Robert", "lastName": "Til", "address": "Via 46 Arezzo", "gender": "Male", "phoneNumber": "01232236562"},
    {"id": 11, "firstName": "Dishu", "lastName": "Bagga", "address": "Via 41 Arezzo", "gender": "Male", "phoneNumber": "01762236562"},
    {"id": 12, "firstName": "Akash", "lastName": "Bagga", "address": "Via 42 Arezzo", "gender": "Male", "phoneNumber": "04442173222"},
]

source = SourceSchema()
sourceArray = SourceSchema(many=True)


@app.route('/employeedata', methods=["GET"])
def get_employee_data():
    return jsonify(EmployeeData);


@app.route('/sourcedata', methods=["POST"])
def add_source_data():
    xPathName = request.json['xPathName']
    name = request.json['name']
    type = request.json['type']
    data = " ".join(map(str, request.json['data']))
    new_source = Source(xPathName=xPathName, name=name,
                        type=type, data=data)
    db.session.add(new_source)
    db.session.commit()
    return jsonify(source.dump(new_source))


@app.route('/sourcedata', methods=["GET"])
def get_source_data():
    all_source_data = Source.query.all()
    result = sourceArray.dump(all_source_data)
    for res in result:
        res["data"] = list(map(int, res["data"].split()))
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
    # app.run(debug=True)
