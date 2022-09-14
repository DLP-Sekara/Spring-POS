package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor //apply No args constructor
@AllArgsConstructor //apply full args constructor
@Data  //apply getters and setters
@ToString  //apply to string methods

@Entity
public class Customer {
    @Id
    private String nic;
    private String name;
    private String address;
    private Double contact;


}
