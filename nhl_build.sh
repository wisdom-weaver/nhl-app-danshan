#!/bin/bash

rm nhl.zip;
npm run build; 
mv build/ nhl;
zip -r nhl.zip nhl/ ;
rm -r nhl ;