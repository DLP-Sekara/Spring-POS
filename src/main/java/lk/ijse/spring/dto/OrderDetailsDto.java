package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Id;

@NoArgsConstructor //apply No args constructor
@AllArgsConstructor //apply full args constructor
@Data  //apply getters and setters
@ToString  //apply to string methods

public class OrderDetailsDto {
    private String oid;
    private String itemCode;
    private String itemName;
    private double unitPrice;
    private int qty;
    private double totalPrice;

}
