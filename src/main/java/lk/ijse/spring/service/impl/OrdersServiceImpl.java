package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.OrderDto;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailsRepo;
import lk.ijse.spring.repo.OrdersRepo;
import lk.ijse.spring.service.OrdersService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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
        if (!ordersRepo.existsById(dto.getOid())) {
            Orders order = mapper.map(dto, Orders.class);
            ordersRepo.save(order);

            if (dto.getOrderDetails().size() < 1) throw new RuntimeException("No items added for the order..!");

            //update the item
            /*for (OrderDetails orderDetail : order.getOrderDetails()) {
                Item item = itemRepo.findById(orderDetail.getItemCode()).get();
                item.setQty(item.getQty() - orderDetail.getQty());
                itemRepo.save(item);
            }*/

        } else {
            throw new RuntimeException("Purchase Order Failed..!, Order ID " + dto.getOid() + " Already Exist.!");
        }
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
        return mapper.map(ordersRepo.findAll(), new TypeToken<List<OrderDto>>() {
        }.getType());
    }

    @Override
    public boolean checkAvailability(String oid) {
        return false;
    }
}
