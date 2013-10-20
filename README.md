#Nature Outlook

Interactive graphic for Nature Outlook built with D3.js
http://d3js.org/

To do:
Add final text and references

	cat outlook-header.html map.html outlook-footer.html > index.html
	cat deploy-header.html map.html deploy-footer.html > deploy/outlook-drought.html


The process:
## Make a new folder for the edited data
mkdir percent-annual-csv

## Copy the data into a new folder
cp -a gpcp_anomalies_percentage_annual/* percent-annual-csv

## Move into that folder
cd percent-annual-csv

### Remove the first line of each file. Also creates a backup.
for fl in *.xyz; 
    do sed -i'.bak' '1d' $fl;
done

## Remove the backup files
rm *.bak

## Remove the 1st column of each file
for fl in *.xyz; 
    do sed -i'.bak' 's/[^ ]* //' $fl;
done

## Remove the backup files
rm *.bak

## Do this again
for fl in *.xyz; 
    do sed -i'.bak' 's/[^ ]* //' $fl; 
done

## Remove the backup files
rm *.bak

## remove .xyz form the file name
for file in *.xyz; 
    do mv "$file" "${file%.xyz}"; 
done

## Remove the trailing "gpcp_anomalies_" from file name
for file in *; 
    do mv "${file}" "${file/gpcp_anomalies_/}"; 
done

## Add 'value' to the start of each file name
for file in *; 
    do mv "$file" "value${file}"; 
done

### Add filename to first line of file
for file in `ls -1 *`
do
    echo "$file" > ./tmpfile
    cat "$file" >> ./tmpfile
    mv ./tmpfile "$file"
done

## replace the csv file extension
for file in *;
    do mv "$file" "${file}.csv"
done

## combine all the csv files into one
paste value1979.csv value1980.csv value1981.csv value1982.csv value1983.csv value1984.csv value1985.csv value1986.csv value1987.csv value1988.csv value1989.csv value1990.csv value1991.csv value1992.csv value1993.csv value1994.csv value1995.csv value1996.csv value1997.csv value1998.csv value1999.csv value2000.csv value2001.csv value2002.csv value2003.csv value2004.csv value2005.csv value2006.csv value2007.csv value2008.csv value2009.csv value2010.csv value2011.csv value2012.csv > new.csv

### Replace tabs with commas
sed -i'.bak' "s/<Control+V><TAB character>/,/g" new.csv

## Open in excel. Format numbers to 2 decimal places. Copy and paste into a new file and save as CSV to permanetly round the numbers.
## Paste in the lat long columns.




Notes:

### Copy the data into a new folder
cp -a gpcp_anomalies_percentage_annual/* percent-annual-csv

### Change the file extension from .xyz to .csv
for file in *.xyz; 
	do mv "$file" "${file%xyz}csv"; 
done

### remove .csv form the file name
for file in *.csv; 
	do mv "$file" "${file%.csv}"; 
done

### Add 'value' to the start of each file name
for file in *
	do mv "$file" "value${file}"
done

### replace the csv file extension
for file in *
	do mv "$file" "${file}.csv"
done


### Add filename to first line of file
for file in `ls -1 *`
do
    echo "$file" > ./tmpfile
    cat "$file" >> ./tmpfile
    mv ./tmpfile "$file"
done


### Remove the first line of each file. Also creates a backup.
for fl in *.csv; 
	do sed -i'.bak' '1d' $fl; 
done

### Remove the backup files
rm *.bak

### Remove the 1st column of each file
for fl in *.csv; 
	do sed -i'.bak' 's/[^ ]* //' $fl; 
done

### Remove the 1st column of each file
for fl in *.csv; 
	do sed -i'.bak' 's/[^ ]* //' $fl; 
done

### Add filename to first line of file
for file in `ls -1 *`
do
    echo "$file" > ./tmpfile
    cat "$file" >> ./tmpfile
    mv ./tmpfile "$file"
done

### Replace spaces with commas
for fl in *.csv; 
	do sed -i'.bak' "s/ /,/g" $fl;
done

### Remove the trailing "gpcp_anomalies_" from file name
for file in *; do mv "${file}" "${file/gpcp_anomalies_/}"; done

### add line numbers with sed and remove character return
sed = new.csv |  sed 'N;s/\n/,/'

### Remove spaces
sed -i'.bak' "s/ //g" old.csv

### Replace tabs with commas
sed -i'.bak' "s/<Control+V><TAB character>/,/g" old.csv

### Add yo! to first line of file
sed -i".bak" '1 i\
	yo!<Control+V><RETURN>' new.csv


for fl in *.csv; 
	do sed -i".bak" '1 i\
	$fl<Control+V><RETURN>' $fl;
done


sed -i".bak" '1 i\
	Cool gadgets and websites /g' new.csv

// copy column 1 to to new file
// cat gpcp_anomalies_2012.csv | awk '{print $3}' > long.csv


Keep only the last column
	sed 's/.* //' new.csv

Remove the 1st column
	sed 's/[^ ]* //' file

### Remove the 1st column of each file
for fl in *.csv; 
	do sed -i'.bak' 's/[^ ]* //' $fl; 
done

### Replace spaces with commas
for fl in *.csv; 
	do sed -i'.bak' "s/ /,/g" $fl;
done

for filename in *.csv; 
	do gsed -i'.bak' "1 i\$filename" $filename; 
done 

for i in *; 
	do echo "$i"; 
	echo ; 
	cat "$i" $i > new.csv; 
	echo ; 
done ;

### Add filename to first line of file
for file in `ls -1 *`
do
    echo "$file" > ./tmpfile
    cat "$file" >> ./tmpfile
    mv ./tmpfile "$file"
done






