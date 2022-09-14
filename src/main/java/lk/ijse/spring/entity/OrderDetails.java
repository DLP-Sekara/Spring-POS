package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
//@IdClass(OrderDetails_PK.class)
@Entity
public class OrderDetails {
    @Id
    private String oid;
    //@Id
    private String itemCode;
    private String itemName;
    private double unitPrice;
    private int qty;
    private double totalPrice;


    @ManyToOne
    @JoinColumn(name = "oid",referencedColumnName = "oid",insertable = false,updatable = false)
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "itemCode",referencedColumnName = "code",insertable = false,updatable = false)
    private Item items;


}
