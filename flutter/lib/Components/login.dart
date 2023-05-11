import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);
  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String url = "https://api-saraswati-coding-club.herokuapp.com/auth/login";
  String msg = "Welcome to login screen";
  String username = "";
  String password = "";
  String errorMessage = "hello world";
  void justSwitch() {
    print("hello world");
  }

  Future<void> submitLogin() async {
    print("username : $username");
    print("password : $password");
    print("inside submit login");
    Map<String, String> body = {"username": username, "password": password};
    print("body : $body");
    var response = await http.post(url, body: body);
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
    final loginResponse = jsonDecode(utf8.decode(response.bodyBytes)) as Map;
    print(
        "loginResponse $loginResponse , ${loginResponse['accepted']} , ${loginResponse['msg']}");
    if (loginResponse['accepted'] == 'no') {
      errorMessage = loginResponse["msg"];
    }

    print("this.errorMessage : $errorMessage");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
      ),
      body: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: <Widget>[
              TextField(
                onChanged: (text) {
                  // print("username is : $text");
                  this.username = text;
                },
                decoration: const InputDecoration(
                  labelText: 'Username',
                ),
              ),
              TextField(
                onChanged: (text) {
                  // print("password is : $text");
                  this.password = text;
                },
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Password',
                ),
              ),
              ElevatedButton(
                  onPressed: () {
                    this.submitLogin();
                  },
                  child: const Text('Login',
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w400,
                          fontSize: 30))),
              Container(alignment: Alignment.center, child: Text(errorMessage)),
            ],
          )),
    );
  }
}

class SecondRoute extends StatelessWidget {
  const SecondRoute({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Second Route'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: const Text('Go back!'),
        ),
      ),
    );
  }
}
