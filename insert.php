<?php
$fname=$_POST['fname'];
$lname=$_POST['lname'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$address=$_POST['address'];
$comment=$_POST['comment'];

if(!empty($fname) || !empty($lname) || !empty($email) ||!empty($comment)){
$host="localhost";
$dbUsername="root";
$dbPassword="";
$dbname="mysql";

$conn=new mysqli($host,$dbUsername,$dbPassword,$dbname);
 if (mysqli_connect_error()) {
     die('Connect Error('. mysqli_connect_errno().')'. mysqli_connect_error());
    }
else{
    $SELECT="SELECT email from myusers where email= ? limit 1";
    $INSERT="INSERT Into myusers (fname,lname,email,phone,address,comment) values(?,?,?,?,?,?)";

    $stmt=$conn->prepare($SELECT);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($email);
    $stmt->store_result();
    $rnum=$stmt->num_rows;

    if($rnum==0){
        $stmt->close();
        $stmt=$conn->prepare($INSERT);
        $stmt->bind_param("sssiss",$fname,$lname,$email,$phone,$address,$comment);
        $stmt->execute();
        echo "new record inserted succesfully";
        header('Location: index.html');
exit();
    }
    else{ 
        
        $query = "UPDATE myusers SET register_date=current_timestamp";
        echo "someone already register using this email";
        
        
    }
    $stmt->close();
    $conn->close();
}
}else{
    echo "All field are required";
    die();
}

?>

