import { register } from "@shopify/web-pixels-extension";

register(({ configuration, analytics, browser }) => {
  analytics.subscribe('page_viewed', (event) => {
    const timeStamp = event.timestamp;

    const pageEventId = event.id;

    const payload = {
      event_name: event.name,
      event_data: {
        pageEventId: pageEventId,
        timeStamp: timeStamp,
      },
    };

    console.log("page_viewed______",payload);
  });

  analytics.subscribe("search_submitted", (event) => {
    const searchResult = event.data.searchResult;

    const searchQuery = searchResult.query;

    const firstProductReturnedFromSearch =
      searchResult.productVariants[0]?.product.title;

    const payload = {
      event_name: event.name,
      event_data: {
        searchQuery: searchQuery,
        firstProductTitle: firstProductReturnedFromSearch,
      },
    };

    console.log("search_submitted________", payload);
  });

  analytics.subscribe("collection_viewed", (event) => {
    const collection = event.data.collection;

    const collectionTitle = collection.title;

    const priceOfFirstProductInCollection =
      collection.productVariants[0]?.price.amount;

    const payload = {
      event_name: event.name,
      event_data: {
        collectionTitle: collectionTitle,
        priceFirstItem: priceOfFirstProductInCollection,
      },
    };

    console.log("collection_viewed_______",payload);
  });

  analytics.subscribe("product_added_to_cart", (event) => {
    const cartLine = event.data.cartLine;

    const cartLineCost = cartLine.cost.totalAmount.amount;

    const cartLineCostCurrency = cartLine.cost.totalAmount.currencyCode;

    const merchandiseVariantTitle = cartLine.merchandise.title;

    const payload = {
      event_name: event.name,
      event_data: {
        cartLineCost: cartLineCost,
        cartLineCostCurrency: cartLineCostCurrency,
        merchandiseVariantTitle: merchandiseVariantTitle,
      },
    };

    console.log("product_added_to_cart____", payload);

  });

  analytics.subscribe("product_viewed", (event) => {
    const productPrice = event.data.productVariant.price.amount;

    const productTitle = event.data.productVariant.title;

    const payload = {
      event_name: event.name,
      event_data: {
        productPrice: productPrice,
        productTitle: productTitle,
      },
    };

    console.log("product_viewed_____", payload);
  });


  analytics.subscribe("checkout_started", (event) => {
    const checkout = event.data.checkout;

    const checkoutTotalPrice = checkout.totalPrice.amount;

    const allDiscountCodes = checkout.discountApplications.map((discount) => {
      if (discount.type === 'DISCOUNT_CODE') {
        return discount.title;
      }
    });
    console.log("CheckoutItems///",checkout );
    const firstItem = checkout.lineItems[0];

    // const firstItemDiscountedValue = firstItem.discountAllocations[0].amount;

    const customItemPayload = {
      quantity: firstItem.quantity,
      title: firstItem.title,
      // discount: firstItemDiscountedValue,
    };

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        discountCodesUsed: allDiscountCodes,
        firstItem: customItemPayload,
      },
    };

    console.log("checkout_started____",payload);

  });


  analytics.subscribe("payment_info_submitted", (event) => {
    const checkout = event.data.checkout;

    const checkoutTotalPrice = checkout.totalPrice.amount;

    const firstDiscountType = checkout.discountApplications[0]?.type;

    const discountCode =
      firstDiscountType === 'DISCOUNT_CODE'
        ? checkout.discountApplications[0]?.title
        : null;

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        firstDiscountCode: discountCode,
      },
    };

    console.log("payment_info_submitted______", payload);
  });

  analytics.subscribe("checkout_completed", (event) => {
    const checkout = event.data.checkout;

    const checkoutTotalPrice = checkout.totalPrice.amount;

    const allDiscountCodes = checkout.discountApplications.map((discount) => {
      if (discount.type === 'DISCOUNT_CODE') {
        return discount.title;
      }
    });

    console.log("CheckoutItems///",checkout );
    const firstItem = checkout.lineItems[0];
    

    // const firstItemDiscountedValue = firstItem.discountAllocations[0].amount;

    const customItemPayload = {
      quantity: firstItem.quantity,
      title: firstItem.title,
      // discount: firstItemDiscountedValue,
    };

    const paymentTransactions = event.data.checkout.transactions.map((transaction) => {
      return {
          paymentGateway: transaction.gateway,
          amount: transaction.amount,
        };
    });

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        discountCodesUsed: allDiscountCodes,
        firstItem: customItemPayload,
        paymentTransactions: paymentTransactions,
      },
    };

    console.log("checkout_completed_______",payload);
  });

  analytics.subscribe("product_removed_from_cart", (event) => {
    const cartLine = event.data.cartLine;

    const cartLineCost = cartLine.cost.totalAmount.amount;

    const cartLineCostCurrency = cartLine.cost.totalAmount.currencyCode;

    const merchandiseVariantTitle = cartLine.merchandise.title;

    const payload = {
      event_name: event.name,
      event_data: {
        cartLineCost: cartLineCost,
        cartLineCostCurrency: cartLineCostCurrency,
        merchandiseVariantTitle: merchandiseVariantTitle,
      },
    };

    console.log("product_removed_from_cart______", payload);
  });

  analytics.subscribe("cart_viewed", (event) => {
    const totalCartCost = event.data.cart.cost.totalAmount.amount;

    const firstCartLineItemName =
      event.data.cart.lines[0]?.merchandise.product.title;

    const payload = {
      event_name: event.name,
      event_data: {
        cartCost: totalCartCost,
        firstCartItemName: firstCartLineItemName,
      },
    };

    console.log("cart_viewed_____", payload);
  });

  analytics.subscribe("checkout_address_info_submitted", (event) => {
    const checkout = event.data.checkout;

    const payload = {
      event_name: event.name,
      event_data: {
        addressLine1: checkout.shippingAddress.address1,
        addressLine2: checkout.shippingAddress.address2,
        city: checkout.shippingAddress.city,
        country: checkout.shippingAddress.country,
      },
    };

    console.log("checkout_address_info_submitted_______", payload);
  });


  analytics.subscribe("checkout_contact_info_submitted", (event) => {
    const checkout = event.data.checkout;

    const email = checkout.email;
    const phone = checkout.phone;

    const payload = {
      event_name: event.name,
      event_data: {
        email: email,
        phone: phone,
      },
    };

    console.log("checkout_contact_info_submitted_______", payload);
  });

  analytics.subscribe("checkout_shipping_info_submitted", (event) => {
    const checkout = event.data.checkout;
    const shippingLine = checkout.shippingLine;

    const price = shippingLine.price.amount;
    const currency = shippingLine.price.currencyCode;

    const payload = {
      event_name: event.name,
      event_data: {
        price: price,
        currency: currency,
      },
    };

    console.log("checkout_shipping_info_submitted_______", payload);
  });

});
