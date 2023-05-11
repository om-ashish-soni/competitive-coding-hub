
import 'dart:io';
import 'dart:ui';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:footer/footer.dart';
import 'package:saraswati_online_judge/home.dart';
import 'package:saraswati_online_judge/login.dart';
import 'package:saraswati_online_judge/problem.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:code_editor/code_editor.dart';
import 'package:http/http.dart' as http;

class ProblemsPage extends StatefulWidget {
  const ProblemsPage({Key? key}) : super(key: key);


  @override
  State<ProblemsPage> createState() => _ProblemPageState();
}

class _ProblemPageState extends State<ProblemsPage> {
  final inputController=TextEditingController();
  final outputController=TextEditingController();
  var problemList=<Map<String,dynamic>>[];
  List<Widget> problemListWidgets=[];
  String MY_ACCESS_TOKEN="-1";
  bool isLoading=true;

  checkLoggedIn() async{
    print("inside checkLogged in");

    SharedPreferences prefs = await SharedPreferences.getInstance();
    print(prefs.getString('ACCESS_TOKEN'));
    if(null != prefs.getString('ACCESS_TOKEN')){
      String ACCESS_TOKEN=prefs.getString('ACCESS_TOKEN')??"-1";
      print("ACCESS_TOKEN IS PRESENT"+ACCESS_TOKEN);
      MY_ACCESS_TOKEN=ACCESS_TOKEN;
    }

  }
  retriveProblems() async {
    print("in retrieve Problems : ");
    String uri='https://api-soj.herokuapp.com/problems/getProblems';
    Map<String,dynamic> body={
      'problemCriteria':{
      }
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
    if(decodedResponse['accepted']=='yes'){
      // problemList=decodedResponse['problemList'];
      // for(var problem in problemList){
      //
      // }
      var retrivedList=decodedResponse['problemList'];
      var currList=<Map<String,dynamic>>[];
      for(var problem in retrivedList){
        // print("type of probelm : ");
        // print(problem.runtimeType);
        currList.add(problem);
      }
      // problemListWidgets.add(Text('first quote'));
      int index=1;
      for(Map<String,dynamic> problem in currList){
        // print(problem['problemcode']);
        String difficulty=problem['difficulty'];
        String problemcode=problem['problemcode'];
        var color;
        if(difficulty=='easy') color=Colors.green;
        else if(difficulty=='medium') color=Colors.orange;
        else if(difficulty=='red') color=Colors.red;
        problemListWidgets.add(
            Container(
              margin: const EdgeInsets.only(top: 10.0),
              child:Row(
                children: [
                  Container(
                    margin: const EdgeInsets.all(5.0),
                    child:Column(
                      children: [
                        Text(
                            index.toString()+".",
                            style:TextStyle(
                              fontSize: 20,
                            )
                        )
                      ],
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.all(5.0),
                    child:Column(
                      children: [
                        Text(

                            difficulty,
                            style:TextStyle(
                                fontSize: 20,
                                color: color
                            )
                        ),
                      ],
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.all(5.0),
                    child:Column(


                      children: [
                        TextButton(
                            onPressed: (){
                              print("going to problem : ");
                              print(problem);
                              Navigator.push(context,
                                  MaterialPageRoute(builder: (context) => ProblemPage(problem:problem))
                              );
                            },
                            child: Text(
                              problemcode,
                              style:TextStyle(
                                fontSize: 20,
                              )
                          ),
                        )

                      ],
                    ),
                  ),




                ],
              ),
            )
            );
        index++;
      }
      // print(currList);
      setState(() {
        isLoading=false;
        problemList=currList;
      });
    }else{
      print("some error occurred");
    }
  }
  _ProblemPageState(){
    print("inside constructor of problempagestate");
    checkLoggedIn();
    retriveProblems();
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('Problems'),
      ),
      body: Center(



        child:SingleChildScrollView( // /!\ important because of the telephone keypad which causes a "RenderFlex overflowed by x pixels on the bottom" error
          // display the CodeEditor widget
            padding:EdgeInsets.only(top:0.0),
            child: Column(
              children: [
                Footer(
                    child: Row(
                        children:[
                          TextButton(
                            onPressed: (){

                            },
                            style: ButtonStyle(
                              // backgroundColor: MaterialStateProperty.all(Colors.blue),
                            ),
                            child:
                            Text(
                              'Home',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                          TextButton(
                            onPressed: (){
                              print("hello world in on pressed of IDE");
                              Navigator.push(context,
                                  MaterialPageRoute(builder: (context) => const HomePage())
                              );
                            },
                            style: ButtonStyle(
                              // backgroundColor: MaterialStateProperty.all(Colors.blue),
                            ),
                            child:
                            Text(
                              'IDE',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                          TextButton(
                            onPressed: (){

                            },
                            style: ButtonStyle(
                              // backgroundColor: MaterialStateProperty.all(Colors.blue),
                            ),
                            child:
                            Text(
                              'Problems',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                          // TextButton(
                          //   onPressed: (){
                          //
                          //   },
                          //   style: ButtonStyle(
                          //     // backgroundColor: MaterialStateProperty.all(Colors.blue),
                          //   ),
                          //   child:
                          //   Text(
                          //     'Profile',
                          //     style: TextStyle(color: Colors.white),
                          //   ),
                          // ),
                          TextButton(
                            onPressed: (){
                              Navigator.pushReplacement(context,
                                  MaterialPageRoute(builder: (context) => const LoginPage())
                              );
                            },
                            style: ButtonStyle(
                              // backgroundColor: MaterialStateProperty.all(Colors.blue),
                            ),
                            child:
                            Text(
                              'Logout',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        ]
                    ),
                    backgroundColor: Colors.blueAccent,
                    padding: EdgeInsets.all(5.0),// Takes EdgeInsetsGeometry with default being EdgeInsets.all(5.0)
                    alignment: Alignment.topCenter
                ),
                isLoading?TextField(
                  enabled: false,
                  maxLines: 50, //or null
                  decoration: InputDecoration(
                      hintStyle: TextStyle(
                        fontSize: 24,
                      ),
                      filled: true,
                      hintText: "Fetching Problems ..................",
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            width: 1.5, color: Colors.blueAccent),
                      )
                  ),
                ):SingleChildScrollView(
                  child:Column(
                    children:problemListWidgets
                  )
                ),
                TextField(
                  enabled: false,
                  maxLines: 20, //or null
                  decoration: InputDecoration(
                      hintStyle: TextStyle(
                        fontSize: 24,
                      ),
                      filled: true,
                      hintText: "",

                  ),
                )


              ],
            )


        ),


      ),


    );
  }
}
