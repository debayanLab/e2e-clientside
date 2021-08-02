import helper

#
# Decrypt a message using private key 
# (and public modulus)
#
def decrypt():
    # open ciphertext
    fo = open("ciphertext.txt", "r")
    c = fo.read().rstrip('\n')
    ciphertext = int(c)
    fo.close()

    # Extract our Public key of the form (e, n)
    PublicKey = tuple(open("public_key.txt", "r"))
    key = int(PublicKey[0])
    n = int(PublicKey[1])

    # Extract private key
    fo = open("private_key.txt", "r")
    p = fo.read().rstrip('\n')
    PrivateKey = int(p)
    fo.close()

    # Decrypt ciphertext using formula
    # m = c^d mod n
    d = (helper.modexp(ciphertext, PrivateKey, n))

    print (str(d))

    return 0

# only executed if not imported
if __name__ == "__main__":
    decrypt()