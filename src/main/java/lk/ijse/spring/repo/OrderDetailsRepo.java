package lk.ijse.spring.repo;

import lk.ijse.spring.entity.OrderDetails;
import lk.ijse.spring.entity.OrderDetails_PK;
//import lk.ijse.spring.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, OrderDetails_PK> {
}
