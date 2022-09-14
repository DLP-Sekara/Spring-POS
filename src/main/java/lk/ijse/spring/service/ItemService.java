package lk.ijse.spring.service;

import lk.ijse.spring.dto.ItemDto;

import java.util.List;

public interface ItemService {
    void saveItem(ItemDto itemDto);

    void deleteItem(String id);

    void updateItem(ItemDto itemDto);

    ItemDto searchItem(String id);

    List<ItemDto> getAllItem();

    boolean checkAvailability(String code);
}
