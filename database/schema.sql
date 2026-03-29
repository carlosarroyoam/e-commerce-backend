-- E-commerce Management System MySQL Schema

CREATE DATABASE IF NOT EXISTS `ecommerce`;

USE `ecommerce`;

CREATE TABLE user_roles (
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    type VARCHAR(32) NOT NULL,
    UNIQUE KEY user_roles_type_idx (type),
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password_hash VARCHAR(96) NOT NULL,
    user_role_id TINYINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY users_email_idx (email),
    INDEX users_deleted_at_idx (deleted_at),
    FULLTEXT users_full_name_idx (first_name , last_name),
    CONSTRAINT users_user_role_id_fk FOREIGN KEY (user_role_id)
        REFERENCES user_roles (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE customers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    KEY customers_user_id_fk (user_id),
    UNIQUE KEY customers_user_id_idx (user_id),
    CONSTRAINT customers_user_id_fk FOREIGN KEY (user_id)
        REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE customer_addresses (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    street_name VARCHAR(64) NOT NULL,
    street_number VARCHAR(5) NOT NULL,
    apartament_number VARCHAR(5),
    sublocality VARCHAR(45) NOT NULL,
    locality VARCHAR(45) NOT NULL,
    state VARCHAR(45) NOT NULL,
    postal_code VARCHAR(5) NOT NULL,
    country VARCHAR(2) DEFAULT 'MX',
    phone_number VARCHAR(10) NOT NULL,
    customer_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    KEY customer_addresses_customer_id_fk (customer_id),
    CONSTRAINT customer_addresses_customer_id_fk FOREIGN KEY (customer_id)
        REFERENCES customers (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admins (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    is_super BIT NOT NULL DEFAULT 0,
    user_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    KEY admins_user_id_fk (user_id),
    UNIQUE KEY admins_user_id_idx (user_id),
    CONSTRAINT admins_user_id_fk FOREIGN KEY (user_id)
        REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    token VARCHAR(254) NOT NULL,
    last_used_at TIMESTAMP DEFAULT NULL,
    fingerprint VARCHAR(36) NOT NULL,
    user_agent VARCHAR(254),
    user_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY personal_access_tokens_token_idx (token),
    UNIQUE KEY personal_access_tokens_fingerprint_user_id_idx (user_id, fingerprint),
    KEY personal_access_tokens_user_id_fk (user_id),
    CONSTRAINT personal_access_tokens_user_id_fk FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categories (
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    INDEX categories_deleted_at_idx (deleted_at),
    UNIQUE KEY categories_title_idx (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(96) NOT NULL,
    slug VARCHAR(96) NOT NULL,
    description TEXT,
    featured BIT NOT NULL DEFAULT 0,
    active BIT NOT NULL DEFAULT 0,
    category_id TINYINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY products_slug_idx (slug),
    FULLTEXT products_title_description_idx (title, description),
    KEY products_category_id_fk (category_id),
    CONSTRAINT products_category_id_fk FOREIGN KEY (category_id)
        REFERENCES categories (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE properties (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    INDEX properties_deleted_at_idx (deleted_at),
    UNIQUE KEY properties_title_idx (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_property_values (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    value VARCHAR(45) NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    property_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY product_property_values_idx (product_id, property_id),
    KEY product_property_values_product_fk (product_id),
    CONSTRAINT product_property_values_product_fk FOREIGN KEY (product_id)
        REFERENCES products (id),
    KEY product_property_values_property_fk (property_id),
    CONSTRAINT product_property_values_property_fk FOREIGN KEY (property_id)
        REFERENCES properties (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE variants (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    sku VARCHAR(64) NOT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT '0',
    compared_at_price DECIMAL(10,2) NOT NULL DEFAULT '0',
    cost_per_item DECIMAL(10,2) NOT NULL DEFAULT '0',
    quantity_on_stock INT UNSIGNED NOT NULL DEFAULT '0',
    product_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    KEY variants_product_id_fk (product_id),
    UNIQUE KEY variants_sku_idx (sku),
    CONSTRAINT variants_product_id_fk FOREIGN KEY (product_id)
        REFERENCES products (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE variant_images (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    url VARCHAR(128) NOT NULL,
    variant_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY variant_images_url_idx (url),
    KEY variant_images_variant_id_fk (variant_id),
    CONSTRAINT variant_images_variant_id_fk FOREIGN KEY (variant_id)
        REFERENCES variants (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE attributes (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    INDEX attributes_deleted_at_idx (deleted_at),
    UNIQUE KEY attributes_title_idx (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE variant_attribute_values (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    value VARCHAR(45) NOT NULL,
    variant_id BIGINT UNSIGNED NOT NULL,
    attribute_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY variant_attribute_values_idx (variant_id, attribute_id),
    KEY variant_attribute_values_variant_id_fk (variant_id),
    CONSTRAINT variant_attribute_values_variant_id_fk FOREIGN KEY (variant_id)
        REFERENCES variants (id),
    KEY variant_attribute_values_attribute_id_fk (attribute_id),
    CONSTRAINT variant_attribute_values_attribute_id_fk FOREIGN KEY (attribute_id)
        REFERENCES attributes (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE movement_types (
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY movement_types_title_idx (title)
)  ENGINE=INNODB AUTO_INCREMENT=3 DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;

CREATE TABLE movements (
    id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    movement_type_id TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY movement_title_idx (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE inventory_movements (
    id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL DEFAULT '0',
    variant_id BIGINT UNSIGNED NOT NULL,
    movement_id TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    KEY inventory_movements_variant_id_fk_idx (variant_id),
    KEY inventory_movements_movement_id_fk (movement_id),
    CONSTRAINT inventory_movements_movement_id_fk FOREIGN KEY (movement_id)
        REFERENCES movements (id),
    CONSTRAINT inventory_movements_variant_id_fk FOREIGN KEY (variant_id)
        REFERENCES variants (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
