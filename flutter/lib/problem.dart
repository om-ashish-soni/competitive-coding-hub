
import 'dart:io';
import 'dart:ui';
import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:footer/footer.dart';
import 'package:saraswati_online_judge/login.dart';
import 'package:saraswati_online_judge/problems.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:code_editor/code_editor.dart';
import 'package:http/http.dart' as http;

class ProblemPage extends StatefulWidget {
  Map<String,dynamic> cproblem={};
  ProblemPage({Key? key,Map<String,dynamic>? problem}){
     // super(key: key);
    if(problem != null){
      this.cproblem=problem;
    }
  }


  @override
  State<ProblemPage> createState() => _ProblemPageState(cproblem:cproblem);
}

class _ProblemPageState extends State<ProblemPage> {
  final inputController=TextEditingController();
  final outputController=TextEditingController();
  Map<String,dynamic> problem={};
  List<Widget> problemWidgetList=[];
  String MY_ACCESS_TOKEN="-1";
  bool isSubmitting=false;
  bool isRunning=false;
  bool isResult=false;
  String status='';
  var verdictColor;
  var source = '''main() {
    print("Hello, World!");
  }
  ''';
  String output='Output of code';
  String code='''
        #include <iostream>
        #include <string>
        using namespace std;
        
        int main() {
          string greeting = "Hello";
          cout << greeting;
          return 0;
        }

        ''';

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
  retriveCode() async{
    print("inside retriveCode in");
    SharedPreferences prefs = await SharedPreferences.getInstance();
    print(prefs.getString('code'));
    if(null != prefs.getString('code')){
      code=prefs.getString('code')??"-1";
      print("code"+code);
    }
  }
  runCode() async{
    setState(() {
      isRunning=true;
      isResult=false;
    });
    print("inside run code : ");
    // print("code : "+code);
    // print("input : "+inputController.text);
    String input=inputController.text;
    String uri='https://api-soj.herokuapp.com/executor/run';
    Map<String,String> body={
      "ACCESS_TOKEN":MY_ACCESS_TOKEN,
      "code":code,
      "inp":input,
      "lang":"c_cpp"
    };
    // print("body : ");
    // print(body);
    var response=await http.post(
      Uri.parse(uri),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body),
    );
    Map<String,dynamic> decodedResponse=jsonDecode(response.body);
    // print("resposne : ");
    // print(decodedResponse);
    if(decodedResponse['result']==null){
      print("some error occurred");
    }else{
      var result=decodedResponse['result'];
      // print("result : ");
      // print(result);
      setState(() {
        output=result['output'];
        outputController.text=output;
      });
      print(result.runtimeType);
    }
    setState(() {
      isRunning=false;
    });
  }
  submitCode() async{
    print("in submit code");
    setState(() {
      isSubmitting=true;
      isResult=false;
    });
    String uri='https://api-soj.herokuapp.com/submit/judge';
    Map<String,String> body={
      "ACCESS_TOKEN":MY_ACCESS_TOKEN,
      "code":code,
      "inp":'',
      "lang":"c_cpp",
      "problemcode":problem['problemcode']
    };
    // print("body : ");
    // print(body);
    var response=await http.post(
      Uri.parse(uri),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body),
    );
    // print(response.body);
    Map<String,dynamic> decodedResponse=jsonDecode(response.body);
    // print("resposne : ");
    // print(decodedResponse);
    if(decodedResponse['result']==null){
      print("some error occurred");
    }else{
      var result=decodedResponse['result'];
      // print("result : ");
      // print(result);
      if(result['status']=='AC'){
        status="ACCEPTED";
        verdictColor=Colors.green;
      }else{
        status="WRONG ANSWER";
        verdictColor=Colors.red;
      }
      setState(() {
        isSubmitting=false;
        isResult=true;
      });
      print(result.runtimeType);
    }
  }
  _ProblemPageState({Map<String,dynamic>? cproblem}){
    if(cproblem != null){
      this.problem=cproblem;
    }
    print("inside constructor of problem page state : ");
    print(cproblem);
    String problemcode=problem['problemcode'];
    String description=problem['description'];
    String constraints=problem['constraints'];
    String sampleinput=problem['sampleinput'];
    String sampleoutput=problem['sampleoutput'];
    String timelimit=problem['timelimit'].toString();
    String memorylimit=problem['memorylimit'].toString();
    inputController.text=sampleinput;
    // problemWidgetList.add(Text("hello world appbar of problem page"));
    problemWidgetList.add(
      Container(
        margin: EdgeInsets.only(top:10.0),
        child:Column(
          // child: Column(
            children: [
              Text(
                  "problem : "+problemcode,
                  style:TextStyle(
                    fontSize: 20,
                  )
              )
            ],
          // ),
        ),
      )
    );
    problemWidgetList.add(
        Container(
          margin: EdgeInsets.only(top:10.0),
          padding: EdgeInsets.all(4.0),
          child:Column(
            // child: Column(
            children: [
              TextField(
                maxLines: 1,
                decoration: InputDecoration(
                  hintText:"description : ",
                ),
              ),
              Text(
                  description,
                  style:TextStyle(
                    fontSize: 20,
                  )
              )
            ],
            // ),
          ),
        )
    );
    problemWidgetList.add(
        Container(
          margin: EdgeInsets.only(top:10.0),
          padding: EdgeInsets.all(4.0),
          child:Column(
            // child: Column(
            children: [
              TextField(
                maxLines: 1,
                decoration: InputDecoration(
                  hintText:"Constraints : ",
                ),
              ),
              Text(
                  constraints,
                  style:TextStyle(
                    fontSize: 20,
                  )
              )
            ],
            // ),
          ),
        )
    );
    problemWidgetList.add(
        Container(
          margin: EdgeInsets.only(top:10.0),
          padding: EdgeInsets.all(4.0),
          child:Column(
            // child: Column(
            children: [
              TextField(
                maxLines: 1,
                decoration: InputDecoration(
                  hintText:"sample input : ",
                ),
              ),
              Text(
                  sampleinput,
                  style:TextStyle(
                    fontSize: 20,
                  )
              )
            ],
            // ),
          ),
        )
    );
    problemWidgetList.add(
        Container(
          margin: EdgeInsets.only(top:10.0),
          padding: EdgeInsets.all(4.0),
          child:Column(
            // child: Column(
            children: [
              TextField(
                maxLines: 1,
                decoration: InputDecoration(
                  hintText:"sample output : ",
                ),
              ),
              Text(
                  sampleoutput,
                  style:TextStyle(
                    fontSize: 20,
                  )
              )
            ],
            // ),
          ),
        )
    );
    problemWidgetList.add(
        Container(
          margin: EdgeInsets.only(top:10.0),
          padding: EdgeInsets.all(4.0),
          child:Column(
            // child: Column(
            children: [
              TextField(
                maxLines: 1,
                decoration: InputDecoration(
                  hintText:"timelimit : ",
                ),
              ),
              Text(
                  timelimit+" ms",
                  style:TextStyle(
                    fontSize: 20,
                  )
              )
            ],
            // ),
          ),
        )
    );
    problemWidgetList.add(
        Container(
          margin: EdgeInsets.only(top:10.0),
          padding: EdgeInsets.all(4.0),
          child:Column(
            // child: Column(
            children: [
              TextField(
                maxLines: 1,
                decoration: InputDecoration(
                  hintText:"memory limit : ",
                ),
              ),
              Text(
                  memorylimit+" Bytes",
                  style:TextStyle(
                    fontSize: 20,
                  )
              )
            ],
            // ),
          ),
        )
    );
  }
  @override
  Widget build(BuildContext context) {
    checkLoggedIn();
    // retriveCode();
    List<FileEditor> files = [
      FileEditor(
          name: "hello.cpp",
          language: "cpp",
          code: code
      )
    ];
    EditorModel model = EditorModel(
      files: files, // the files created above
      // you can customize the editor as you want
      styleOptions: EditorModelStyleOptions(
        fontSize: 13,
      ),
    );
    return Scaffold(
      appBar: AppBar(
        title: Text(problem['problemcode']),
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
                              Navigator.push(context,
                                  MaterialPageRoute(builder: (context) => const ProblemsPage())
                              );
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
                              print("hello world in on pressed of problems");
                              Navigator.push(context,
                                  MaterialPageRoute(builder: (context) => const ProblemsPage())
                              );
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
                    alignment: Alignment.bottomCenter
                ),
                SingleChildScrollView(
                  child:Column(
                    children: problemWidgetList,
                  )
                ),
                TextField(
                  maxLines: 1,
                  decoration: InputDecoration(
                    hintText:"Code : ",
                  ),
                ),
                CodeEditor(

                  model: model, // the model created above, not required since 1.0.0
                  disableNavigationbar: false, // hide the navigation bar ? by default false
                  onSubmit: (String? language, String? value) async{
                    if(value != null){
                      code=value;
                    }
                  }, // when the user confirms changes in one of the files
                  textEditingController: null, // Provide an optional, custom TextEditingController.
                ),
                Container(
                  child:isSubmitting?
                  Text(
                      'judging ...',
                      style:TextStyle(
                          fontSize: 24
                      )
                  )
                      :
                  Text(''),
                ),
                Container(
                  child:isRunning?
                  Text(
                      'Running ...',
                      style:TextStyle(
                          fontSize: 24
                      )
                  )
                      :
                  Text(''),
                ),
                Container(
                  child:isResult?
                  Text(
                      status,
                      style:TextStyle(
                          fontSize: 24,
                          color:verdictColor
                      )
                  )
                      :
                  Text(''),
                ),
                Row(
                  children: [
                    Container(
                      margin: EdgeInsets.all(10.0),
                      width: 150,
                      child:TextButton(
                        onPressed: runCode,
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all(Colors.blue),
                        ),
                        child:
                        Text(
                          'Run',
                          style: TextStyle(color: Colors.white),
                        ),

                      ),
                    ),
                    Container(
                      margin: EdgeInsets.all(10.0),
                      width: 150,
                      child:TextButton(
                        onPressed: submitCode,
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all(Colors.blue),
                        ),
                        child:
                        Text(
                          'Submit',
                          style: TextStyle(color: Colors.white),
                        ),

                      ),
                    )
                  ],
                ),
                TextField(
                  maxLines: 1,
                  decoration: InputDecoration(
                    hintText:"Input : ",
                  ),
                ),

                TextField(
                  maxLines: 8, //or null
                  decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.yellow[100],
                      hintText: "Enter your input here",
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            width: 1.5, color: Colors.blueAccent),
                      )
                  ),
                  controller: inputController,
                ),
                TextField(
                  maxLines: 1,
                  decoration: InputDecoration(
                    hintText:"Output : ",
                  ),
                ),
                TextField(

                  maxLines: 8, //or null
                  decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.orange[100],
                      hintText: 'output',
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                            width: 1.5, color: Colors.blueAccent),
                      )
                  ),
                  controller: outputController,
                ),


              ],
            )


        ),


      ),


    );
  }
}
