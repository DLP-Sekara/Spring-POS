package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDto;

import java.util.List;

public interface CustomerService {

    void saveCustomer(CustomerDto customerDto);

    void deleteCustomer(String nic);

    void updateCustomer(CustomerDto customerDto);

    CustomerDto searchCustomer(String nic);

    List<CustomerDto> getAllCustomer();

    boolean checkAvailability(String nic);

    CustomerDto getCustomerDetails(String name);
}
