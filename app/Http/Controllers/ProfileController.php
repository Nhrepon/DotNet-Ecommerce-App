<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



class ProfileController extends Controller
{
    public function index($id=1)
    {
        $name="Donal Trump";
        $age="75";

        $data=[
            'id'=>$id,
            'name'=>$name,
            'age'=>$age
        ];


        $name = "access_token";
        $value = "123-XYZ";
        $minutes = 1;
        $path = '/';
        $domain = $_SERVER['SERVER_NAME'];
        $secure = false;
        $httpOnly = true;

        $cookie = cookie($name, $value, $minutes, '', '', $secure, $httpOnly)->withPath($path)->withDomain($domain);



        return response($data, 200)->cookie($cookie);


    }
}
