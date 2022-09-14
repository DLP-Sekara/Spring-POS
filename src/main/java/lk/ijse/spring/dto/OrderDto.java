package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate date;
    private double totalPrice;
    private CustomerDto customer;
    private List<OrderDetailsDto> orderDetails;
}
