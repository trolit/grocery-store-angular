package com.trolit.github.grocerystore.dto.product;

import java.math.BigDecimal;

public class UpdatedProductPriceDto {

    private BigDecimal price;

    private BigDecimal previousPrice;

    public UpdatedProductPriceDto() { }

    public UpdatedProductPriceDto(BigDecimal price, BigDecimal previousPrice) {
        this.price = price;
        this.previousPrice = previousPrice;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getPreviousPrice() {
        return previousPrice;
    }

    public void setPreviousPrice(BigDecimal previousPrice) {
        this.previousPrice = previousPrice;
    }
}
