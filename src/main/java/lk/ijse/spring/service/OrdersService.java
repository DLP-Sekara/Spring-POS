package lk.ijse.spring.service;

import lk.ijse.spring.dto.OrderDto;

import java.util.List;

public interface OrdersService {

    void purchaseOrder(OrderDto dto);

    void deleteOrder(String oid);

    void updateOrder(OrderDto dto);

    OrderDto searchOrder(String oid);

    List<OrderDto> getAllOrders();

    boolean checkAvailability(String oid);
}
