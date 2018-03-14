package com.galgeleg;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
public class WelcomeController {

    // inject via application.properties
    @Value("${app.welcome.message}")
    private String MESSAGE = "";

    @Value("${app.welcome.title}")
    private String TITLE = "";

    @RequestMapping("/")
    public String welcome(Map<String, Object> model) {
        model.put("title", TITLE);
        model.put("message", MESSAGE);
        return "welcome";
    }
    @RequestMapping("index")
    public String index(){
        return "index";
    }
    @RequestMapping("galgeleg")
    public String galgeleg(){
        return "galgeleg";
    }

     //test 5xx errors
    @RequestMapping("/5xx")
    public String ServiceUnavailable() {
        throw new RuntimeException("ABC");
    }

}