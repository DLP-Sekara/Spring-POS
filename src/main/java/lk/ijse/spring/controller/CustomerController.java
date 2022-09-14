package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CustomerDto;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("customer")
public class CustomerController {

    @Autowired
    //CustomerServiceImpl customerService;
    CustomerService customerService;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCustomer(){
        return new ResponseUtil(200,"Done",customerService.getAllCustomer());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCustomer(@RequestBody CustomerDto customer){
        customerService.saveCustomer(customer);
        return new ResponseUtil(200,"Customer Added successfully",null);
    }
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCustomer(@RequestBody CustomerDto customer){
        System.out.println(customer);
        customerService.updateCustomer(customer);
        return new ResponseUtil(200,"Customer updated successfully",null);
    }

    @DeleteMapping(params = {"nic"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCustomer(@RequestParam String nic){
        customerService.deleteCustomer(nic);
        return new ResponseUtil(200,"Customer deleted successfully",null);
    }

  /*  @GetMapping(path="/{nic}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCustomer(@PathVariable String nic){
        return new ResponseUtil(200,"Done",customerService.searchCustomer(nic));
    }*/

    @GetMapping(path="/{nic}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil checkAvailability(@PathVariable String nic){
        return new ResponseUtil(200,"Done",customerService.checkAvailability(nic));
    }

    @GetMapping(params = {"name"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomerDetails(@RequestParam String name){
        return new ResponseUtil(200,"Done",customerService.getCustomerDetails(name));
    }
}
