package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.OrderDto;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailsRepo;
import lk.ijse.spring.repo.OrdersRepo;
import lk.ijse.spring.service.OrdersService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@Transactional
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersRepo ordersRepo;

    @Autowired
    private OrderDetailsRepo orderDetailsRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void purchaseOrder(OrderDto dto) {

    }

    @Override
    public void deleteOrder(String oid) {

    }

    @Override
    public void updateOrder(OrderDto dto) {

    }

    @Override
    public OrderDto searchOrder(String oid) {
        return null;
    }

    @Override
    public List<OrderDto> getAllOrders() {
        return null;
    }

    @Override
    public boolean checkAvailability(String oid) {
        return false;
    }
}
