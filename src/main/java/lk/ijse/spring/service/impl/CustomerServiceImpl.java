package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDto;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo repo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveCustomer(CustomerDto customerDto) {
        if (!repo.existsById(customerDto.getNic())) {
            Customer entity = mapper.map(customerDto, Customer.class);
            repo.save(entity);
        } else {
            throw new RuntimeException("Customer Already Exist...");
        }
    }

    @Override
    public void deleteCustomer(String nic) {
        if (repo.existsById(nic)) {
            repo.deleteById(nic);
        } else {
            throw new RuntimeException("Please check the customer nic");
        }
    }

    @Override
    public void updateCustomer(CustomerDto customerDto) {
        if (repo.existsById(customerDto.getNic())) {
            Customer entity = mapper.map(customerDto, Customer.class);
            repo.save(entity);
        } else {
            throw new RuntimeException("No such customer");
        }
    }

    @Override
    public CustomerDto searchCustomer(String nic) {
        if (repo.existsById(nic)) {
            Customer customer = repo.findById(nic).get();
            CustomerDto map = mapper.map(customer, CustomerDto.class);
            return map;
        } else {
            throw new RuntimeException("No customer");
        }
    }

    @Override
    public List<CustomerDto> getAllCustomer() {
        List<Customer> all = repo.findAll();
        return mapper.map(all,new TypeToken<List<CustomerDto>>(){}.getType());

    }

    @Override
    public boolean checkAvailability(String nic) {
        if(repo.existsById(nic)){
            return true;
        }else {
            return false;
        }
    }

    @Override
    public CustomerDto getCustomerDetails(String name) {
        Customer temp=repo.findCustomerByName(name);
        CustomerDto map = mapper.map(temp, CustomerDto.class);
        return map;
    }

}
