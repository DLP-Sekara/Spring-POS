package lk.ijse.spring.controller;

import lk.ijse.spring.dto.ItemDto;
import lk.ijse.spring.service.ItemService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("item")
public class ItemController {
    @Autowired
    ItemService itemService;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllItem(){
        return new ResponseUtil(200,"Done",itemService.getAllItem());
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveItem(@RequestBody ItemDto item){
        itemService.saveItem(item);
        return new ResponseUtil(200,"Done",null);
    }
    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateItem(@RequestBody ItemDto item){
        itemService.updateItem(item);
        return new ResponseUtil(200,"Done",null);
    }

    @DeleteMapping(params = {"code"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteItem(@RequestParam String code){
        itemService.deleteItem(code);
        return new ResponseUtil(200,"Done",null);
    }

   /* @GetMapping(path="/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchItem(@PathVariable String id){
        return new ResponseUtil(200,"Done",itemService.searchItem(id));
    }*/
   @GetMapping(path="/{code}",produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseUtil checkAvailability(@PathVariable String code){
       return new ResponseUtil(200,"Done",itemService.checkAvailability(code));
   }
}
