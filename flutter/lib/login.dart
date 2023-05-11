import 'dart:convert';
import 'package:saraswati_online_judge/signin.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'home.dart';
class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);


  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
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
  void loginSubmit() async{

    print("going to login");
    print("username : "+usernameController.text);
    print("password : "+passwordController.text);
    String username=usernameController.text;
    String password=passwordController.text;
    setState((){
      myerror='';
      notification='logging you in , please wait ....';
    });
    String uri='https://api-soj.herokuapp.com/auth/login';
    Map<String,String> body={
      "username":username,
      "password":password
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
        title: Text('SOJ Login'),
      ),
      body: Center(
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
            TextButton(
              onPressed: loginSubmit,
              style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.blue)),
              child:Container(
                width:double.infinity,
                margin: EdgeInsets.all(5.0),
                child:Center(
                  child:Text(
                    'login',
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
                      MaterialPageRoute(builder: (context) => const SigninPage())
                  );
                },
                style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.orange)),
                child:Container(
                  width:double.infinity,
                  child:Center(
                    child:Text(
                      'Not a user ? Signin',
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
            ),
          ],
        ),
      ),
    );
  }
}