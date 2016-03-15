create table if not exists products(
	barcode integer primary key NOT NULL, --unique barcode of product
	name text NOT NULL, --name of the product
	brand text,  --brand of product if listed
	quantity int, --quantity of product in grams if listed
	image text  --sample image of product if there is 
);