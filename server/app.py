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


source = SourceSchema()
sourceArray = SourceSchema(many=True)



@app.route('/sourcedata', methods=["POST"])
def add_source_data():
    xPathName = request.json['xPathName']
    name = request.json['name']
    type = request.json['type']
    data = " ".join(map(str, request.json['data']))  # convert list of array into strings

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
        res["data"] = list(map(int, res["data"].split()))  # converting string into list
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
