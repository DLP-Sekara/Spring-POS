package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor //apply No args constructor
@AllArgsConstructor //apply full args constructor
@Data  //apply getters and setters
@ToString  //apply to string methods

public class CustomerDto {
    private String nic;
    private String name;
    private String address;
    private Double contact;
}
