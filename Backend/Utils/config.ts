class Config{
public webPort = 8080;
public webHost = "localhost"
public mySQLhost = 'localhost';
public mySQLuser = 'root';
public mySQLpassword = '12345678';
public mySQLdb = 'vacations';
}

const config= new Config()
export default config
//this way we will export the event and not the class 
//saving us the new config step for evry import