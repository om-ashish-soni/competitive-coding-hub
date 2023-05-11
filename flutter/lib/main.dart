import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'login.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget  {
  const MyApp({Key? key}) : super(key: key);

  startupTasks() async{
    print("inside startup tasks ");
    SharedPreferences.setMockInitialValues({});
  }
  @override
  Widget build(BuildContext context) {
    startupTasks();
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Saraswati Online Judge'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;


  void goToJoin(){
    print("going to join");
    Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const LoginPage())
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[

            TextButton(
                onPressed: goToJoin,
                style: ButtonStyle(backgroundColor: MaterialStateProperty.all(Colors.blue)),
                child:
                Text(
                  'Join',
                  style: TextStyle(color: Colors.white),
                )
            )
          ],
        ),
      ),
    );
  }
}
