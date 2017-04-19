#Nature Outlook

Interactive graphic for Nature Outlook built with D3.js
http://d3js.org/

Published at: http://www.nature.com/nature/journal/v501/n7468_supp/interactive3/drought-map.html

### Build

Uses [Grunt](http://gruntjs.com/) to build `index.html`.

Install dependencies with `$ npm install`

Type `grunt concat` to automatically concat `index.html` into assets and dist folders.

###To do:
	Add final text and references


###The data conversion process
Convert a directory of .xyz files into a single .csv file to be parsed by D3.js

Make a new folder for the edited data:
>	mkdir percent-annual-csv

Copy the data into a new folder
>	cp -a gpcp_anomalies_percentage_annual/* percent-annual-csv

Move into that folder
>	cd percent-annual-csv

Remove the first line of each file. Also creates a backup.
>	for fl in *.xyz; 
>		do sed -i'.bak' '1d' $fl;
>	done

Remove the backup files
>	rm *.bak

Remove the 1st column of each file
>	for fl in *.xyz; 
>    	do sed -i'.bak' 's/[^ ]* //' $fl;
>	done

Remove the backup files
>	rm *.bak

Do this again
>	for fl in *.xyz; 
>    	do sed -i'.bak' 's/[^ ]* //' $fl; 
>	done

Remove the backup files
>	rm *.bak

Remove .xyz form the file name
>	for file in *.xyz; 
>		do mv "$file" "${file%.xyz}"; 
>	done

Remove the trailing "gpcp_anomalies_" from file name
>	for file in *; 
>		do mv "${file}" "${file/gpcp_anomalies_/}"; 
>	done

Add 'value' to the start of each file name
>	for file in *; 
>		do mv "$file" "value${file}"; 
>	done

Add filename to first line of file
>	for file in `ls -1 *`
>	do
>		echo "$file" > ./tmpfile
>		cat "$file" >> ./tmpfile
>		mv ./tmpfile "$file"
>	done

Replace the csv file extension
>	for file in *;
>		do mv "$file" "${file}.csv"
>	done

Combine all the csv files into one
>	paste value1979.csv value1980.csv value1981.csv value1982.csv value1983.csv value1984.csv value1985.csv value1986.csv value1987.csv value1988.csv value1989.csv value1990.csv value1991.csv value1992.csv value1993.csv value1994.csv value1995.csv value1996.csv value1997.csv value1998.csv value1999.csv value2000.csv value2001.csv value2002.csv value2003.csv value2004.csv value2005.csv value2006.csv value2007.csv value2008.csv value2009.csv value2010.csv value2011.csv value2012.csv > new.csv

Replace tabs with commas
>	sed -i'.bak' "s/<Control+V><TAB character>/,/g" new.csv

Open in excel. Format numbers to 2 decimal places. Copy and paste into a new file and save as CSV to permanetly round the numbers.
Paste in the lat long columns.
