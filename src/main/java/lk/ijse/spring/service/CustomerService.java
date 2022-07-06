package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDto;

import java.util.List;

public interface CustomerService {

    void saveCustomer(CustomerDto customerDto);

    void deleteCustomer(String id);

    void updateCustomer(CustomerDto customerDto);

    CustomerDto searchCustomer(String id);

    List<CustomerDto> getAllCustomer();
}
