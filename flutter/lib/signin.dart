import 'dart:convert';
import 'package:saraswati_online_judge/login.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'home.dart';
class SigninPage extends StatefulWidget {
  const SigninPage({Key? key}) : super(key: key);


  @override
  State<SigninPage> createState() => _SigninPageState();
}

class _SigninPageState extends State<SigninPage> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final countryController = TextEditingController();
  final fullnameController = TextEditingController();
  final stateController = TextEditingController();
  final cityController = TextEditingController();
  final professionController = TextEditingController();
  final instituteController = TextEditingController();
  final errorController = TextEditingController();
  String myerror='';
  String notification='';
  void checkLoggedIn() async{
    print("inside checkLogged in login.dart");

    SharedPreferences prefs = await SharedPreferences.getInstance();
    print(prefs.getString('ACCESS_TOKEN'));
    if(null != prefs.getString('ACCESS_TOKEN')){
      Navigator.pushReplacement(context,
          MaterialPageRoute(builder: (context) => const HomePage())
      );
    }
  }
  void signinSubmit() async{

    print("going to login");
    print("username : "+usernameController.text);
    print("password : "+passwordController.text);
    String username=usernameController.text;
    String password=passwordController.text;
    String fullname=fullnameController.text;
    String country=countryController.text;
    String state=stateController.text;
    String city=cityController.text;
    String profession=professionController.text;
    String institute=instituteController.text;
    setState((){
      myerror='';
      notification='signing you in , please wait ....';
    });
    String uri='https://api-soj.herokuapp.com/auth/signin';
    Map<String,String> body={
      "username":username,
      "password":password,
      "fullname":fullname,
      "country":country,
      "state":state,
      "city":city,
      "profession":profession,
      "institute":institute
    };
    var response=await http.post(
      Uri.parse(uri),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body),
    );
    Map<String,dynamic> decodedResponse=jsonDecode(response.body);
    print("resposne : ");
    print(decodedResponse);
    if(decodedResponse['accepted']=='no'){
      setState((){
        myerror=decodedResponse['error'];
        notification='';
      });
      // myerror=decodedResponse['error'];
      print("myerror : "+decodedResponse['error']);
    }else{
      String ACCESS_TOKEN=decodedResponse['ACCESS_TOKEN'];
      print("ACCESS_TOKEN : "+ACCESS_TOKEN);
      SharedPreferences prefs = await SharedPreferences.getInstance();
      // int counter = (prefs.getInt('counter') ?? 0) + 1;
      await prefs.setString('ACCESS_TOKEN', ACCESS_TOKEN);
      Navigator.pushReplacement(context,
          MaterialPageRoute(builder: (context) => const HomePage())
      );
    }
  }
  @override
  Widget build(BuildContext context)  {
    // checkLoggedIn();
    return Scaffold(
      appBar: AppBar(
        title: Text('SOJ Signin'),
      ),
      body: Center(
        child:SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextField(

                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'User Name',
                  hintText: 'Enter Your UserName',
                ),
                controller: usernameController,
              ),
              TextField(
                obscureText: true,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Password',
                  hintText: 'password',
                ),
                controller: passwordController,
              ),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'fullname',
                  hintText: 'fullname',
                ),
                controller: fullnameController,
              ),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'country',
                  hintText: 'country',
                ),
                controller: countryController,
              ),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'state',
                  hintText: 'state',
                ),
                controller: stateController,
              ),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'city',
                  hintText: 'city',
                ),
                controller: cityController,
              ),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'profession',
                  hintText: 'profession',
                ),
                controller: professionController,
              ),
              TextField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'institute',
                  hintText: 'institute',
                ),
                controller: instituteController,
              ),
              TextButton(
                  onPressed: signinSubmit,
                  style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.blue)),
                  child:Container(
                      width:double.infinity,
                      margin: EdgeInsets.all(5.0),
                      child:Center(
                        child:Text(
                          'Signin',
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 20
                          ),
                        ),
                      )
                  )

              ),
              Container(
                  margin: EdgeInsets.only(top:20.0),
                  child:TextButton(
                      onPressed: (){
                        Navigator.pushReplacement(context,
                            MaterialPageRoute(builder: (context) => const LoginPage())
                        );
                      },
                      style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.orange)),
                      child:Container(
                          width:double.infinity,
                          child:Center(
                              child:Text(
                                'Already a user ? Login',
                                style: TextStyle(
                                    fontSize: 20,
                                    color:Colors.white
                                ),
                              )
                          )
                      )
                  )

              ),
              Text(
                myerror,
                style: TextStyle(
                    color: Colors.blueAccent,
                    fontSize: 20
                ),
              ),
              Text(
                notification,
                style: TextStyle(
                    color: Colors.deepOrangeAccent,
                    fontSize: 20
                ),
              )
            ],
          ),
        )

      ),
    );
  }
}