package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.OrderDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor //apply No args constructor
@AllArgsConstructor //apply full args constructor
@Data  //apply getters and setters
@ToString  //apply to string methods

public class OrderDto {
    private String oid;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String customerName;
    private double totalPrice;
    private double cash;
    private double discount;
    private Customer customer;
    private List<OrderDetails> orderDetails;

}
