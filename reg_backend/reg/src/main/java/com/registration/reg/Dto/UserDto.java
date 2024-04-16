package com.registration.reg.Dto;
// User Data Transfer Object
public class UserDto {  


    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private int age;
    private String location;

    public UserDto(int id, String firstName, String lastName, String email, String phone,int age, String location){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.location = location;
    
    }
    
    public UserDto(){
    
    }
    
    public int getid() {
        return id;
    }
    public String getfirstName() {
        return firstName;
    }
    public String getlastName() {
        return lastName;
    }
    public String getemail() {
        return email;
    }
    public String getphone() {
        return phone;
    }
    public String getlocation(){
        return location;
    }
    public int getage() {
        return age;
    }
    public void setid(int id) {
        this.id = id;
    }
    public void setfirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setlastName(String lastName) {
        this.lastName = lastName;
    }
    public void setemail(String email) {
        this.email = email;
    }
    public void setphone(String phone) {
        this.phone = phone;
    }
    public void setlocation(String location) {
        this.location = location;
    }

    @Override
    public String toString(){
        return "User{" + "id=" +id + "," 
        +"firstname=" + firstName + "," 
        + "lastname="+ lastName + ","
        + "email=" + email + ","
        + "phone=" + phone + ","
        + "age=" + age + ","
        + "location=" + location ;
    }

}
