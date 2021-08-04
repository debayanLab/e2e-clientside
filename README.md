# e2e-clientside

Client side implementation of Prof. V Kamakoti's Second Proposal to the Madras High Court. The original paper can be found [here](https://ia801009.us.archive.org/24/items/reportofprof.kamakotiinwpnos.20214and20774of2018/Report%20of%20Prof.%20Kamakoti%20in%20WP%20Nos.20214%20and%2020774%20of%202018_text.pdf)

## The Proposal

Prof. Kamakoti's Second Proposal included Encrypting the userID of the originator using a public key provided by WhatsApp, which can only be decrypted by its corresponding private key.

## Steps to run

First, clone the repository into your local machine

```sh
$ git clone --single-branch -b kamakoti-v2-honest https://github.com/debayanLab/e2e-clientside
```

Install all required dependencies

```sh
$ npm install
```

After making sure that the backend is running, start the development server

```sh
$ npm start
```
