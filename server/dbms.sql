CREATE DATABASE tcms;

use tcms;

CREATE TABLE IF NOT EXISTS users (  id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                      username VARCHAR(255) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      code VARCHAR(255) NOT NULL,
                      phone_no numeric(10))
                    CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS usercodes (  id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                          code VARCHAR(255) NOT NULL,
                          frequency INT(11) DEFAULT 1,
                          starttime TIMESTAMP DEFAULT NOW())
                       CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS parties (
                       	id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                       	name	VARCHAR(255) NOT NULL,
                        city  VARCHAR(45) NOT NULL,
                        state  VARCHAR(45) NOT NULL,
                        phone_no  VARCHAR(45) NULL,
                        gstn_no VARCHAR(45) NULL
                  ) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS states (
                id INT NOT NULL AUTO_INCREMENT,
                abbr VARCHAR(5) NULL DEFAULT NULL,
                name VARCHAR(65) NULL,
                PRIMARY KEY (id),
                UNIQUE INDEX id_UNIQUE (id ASC));

CREATE TABLE IF NOT EXISTS transporters (
                      	id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                      	name	VARCHAR(255) NOT NULL,
                        city  VARCHAR(45) NOT NULL,
                        state  VARCHAR(45) NOT NULL,
                        phone_no  VARCHAR(45) NULL,
                        gstn_no VARCHAR(45) NULL
                      ) CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS cities (
              id INT NOT NULL AUTO_INCREMENT,
              name VARCHAR(45) NULL,
              state VARCHAR(45) NULL,
              PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS transportentry (
                id INT NOT NULL AUTO_INCREMENT,
                invoice_no VARCHAR(45) NOT NULL,
                bill_date DATETIME NULL,
                party INT(11) NULL,
                item_desc VARCHAR(225) NULL,
                amount VARCHAR(45) NULL,
                cgst VARCHAR(45) NULL,
                sgst VARCHAR(45) NULL,
                igst VARCHAR(45) NULL,
                total VARCHAR(45) NULL,
                eway_no VARCHAR(45) NULL,
                transporter INT(11) NULL,
                lr_no VARCHAR(45) NULL,
                booking_stn VARCHAR(45) NULL,
                bilty_date DATETIME NULL,
                bale_qty INT(10) NULL,
                weight VARCHAR(45) NULL,
                freight VARCHAR(45) NULL,
                bale_numbers VARCHAR(125) NULL,
                bale_type VARCHAR(45) NULL,
                PRIMARY KEY (id),
                UNIQUE INDEX id_UNIQUE (id ASC),
                UNIQUE INDEX invoice_no_UNIQUE (invoice_no ASC));

CREATE TABLE IF NOT EXISTS baledetails (  id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                          lr_no VARCHAR(55) NOT NULL,
                          bale_no INT(22),
                          bale_desc VARCHAR(55),
                          qty VARCHAR(55),
                          freight VARCHAR(55) )
                       CHARACTER SET utf8;

  INSERT INTO users (username, password,email,phone_no,code)  VALUES("Sumit Begwani", 'qwert123',"begwani.sumit@gmail.com", "9811187708","niaj123");
  INSERT INTO usercodes(code, frequency) VALUES ('niaj123', '1');

  CREATE TABLE customcolumns (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    display_name VARCHAR(45) NULL,
    status VARCHAR(45) NULL,
    tablename VARCHAR(45) NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX id_UNIQUE (id ASC));

INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('invoice_no','Invoice No','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('bill_date','Bill date','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('party','Party','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('amount','Amount','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('transporter','Transporter','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('lr_no','LR No','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('booking_stn','Booking Station','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('bilty_date','Bilty Date','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('bale_qty','Bale Quantity','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('weight','Weight','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('freight','Freight','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('bale_numbers','Bale Numbers','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('bale_type','Bale Type','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('cgst','Cgst','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('sgst','Sgst','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('igst','Igst','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('total','Total','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('bale_desc','Bale Description','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('item_desc','Item Description','true','transportentry');
INSERT INTO customcolumns (name, display_name, status, tablename) VALUES ('eway_no','EWay No','true','transportentry');

ALTER TABLE baledetails ADD COLUMN received_date DATE NULL AFTER freight;
ALTER TABLE baledetails ADD COLUMN sold_date DATE NULL AFTER received_date, ADD COLUMN Remarks VARCHAR(120) NULL AFTER sold_date;
ALTER TABLE baledetails ADD COLUMN invoice_no VARCHAR(45) NULL AFTER id;

/*new queries*/
CREATE TABLE IF NOT EXISTS masterpayment (
             id INT NOT NULL AUTO_INCREMENT,
             transporter VARCHAR(100) NULL,
             bill_date DATETIME NULL,
             mode  VARCHAR(45) NULL,
             cheque_no VARCHAR(45) NULL,
             amount VARCHAR(45) NULL,
             tds VARCHAR(45) NULL,
             total VARCHAR(45) NULL,
             remarks VARCHAR(45) NULL,
             PRIMARY KEY (id));
ALTER TABLE baledetails ADD COLUMN payment_date DATE NULL AFTER sold_date;
CREATE TABLE IF NOT EXISTS paymentreference (
             id INT NOT NULL AUTO_INCREMENT,
             transporter VARCHAR(100) NULL,
             start_date DATETIME NULL,
             end_date  DATETIME NULL,
             status VARCHAR(45) NULL,
             lr_no VARCHAR(45) NULL,
             removedLrs VARCHAR(45) NULL,
             PRIMARY KEY (id));

ALTER TABLE paymentreference ADD COLUMN name VARCHAR(45) NULL AFTER id;
ALTER TABLE paymentreference ADD COLUMN date DATE NULL AFTER name;

ALTER TABLE tcms.transportentry
ADD UNIQUE INDEX lr_no_UNIQUE (lr_no ASC),
DROP INDEX invoice_no_UNIQUE ;
/* Dummy Queries */
/*  INSERT INTO parties (name, city, state) VALUES ('Amantran Bastralaya', 'dinhata', 'WB');
  INSERT INTO parties (name, city, state) VALUES ('Bhansali enterprises', 'kolkata', 'WB');
  INSERT INTO parties (name, city, state, phone_no) VALUES ('Swapan Kr Saha', 'delhi', 'DEL', '9811187708');

  INSERT INTO transportentry (invoice_no, bill_date, party, item_desc, amount, cgst, sgst, total, transporter, lr_no, booking_stn, bilty_date, bale_qty, weight, freight,bale_numbers,bale_type) VALUES ('abc1', '2018-03-22T15:00:30', '2', 'xcsdx sdsd', '10', '0', '0', '10', '5', 'sd1', 'rew', '2018-03-22T15:00:52', '5', '25','250','1,2,3,4,5','autoIncrement');
*/
