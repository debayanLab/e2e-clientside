import random
import helper

size = 512

#
# Generate public-private key pair
# 
def generateKeyPair():
	# We first create our modulus = product of 2 large
	# primes p and q	

	# Generate p
	p = helper.gen()

	# Generate q
	q = helper.gen()

	n = p * q

	modulo = (p-1)*(q-1)

	# Generate public key
	while True:
		e = random.randrange(2**(size - 1), 2**(size))
		if helper.gcd(e, modulo) == 1:
			break # we found our key!

	# Calculate private key
	# d = modular inverse of e
	d = helper.modInverse (e, modulo)

	# Return required public, private keys
	PublicKey = (e, n)
	PrivateKey = d
	return (PublicKey, PrivateKey)

#
#  Write keys into file
#
#  ----------------------- TODO ------------------------------
#  ASN.1 syntax - 
#  RSAPublicKeyForRSAEncryption::= SEQUENCE {
#       modulus           INTEGER, -- the RSA modulus n
#       publicExponent    INTEGER  -- the RSA public exponent e
# 	}		
#
def makeKeys ():
	# Public key in the form of (e, n) 
	# Private ket in the form of (d, n)
	PublicKey, PrivateKey = generateKeyPair()

	print ("Writing public key")

	# write public key
	fo = open("public_key.txt", "w")
	fo.write(str(PublicKey[0]).rstrip('\n'))
	fo.write("\n")
	fo.write(str(PublicKey[1]).rstrip('\n'))


	print ("Writing private key")


	# write private key
	fo = open("private_key.txt", "w")
	fo.write(str(PrivateKey).rstrip('\n'))
	fo.write("\n")
	fo.write(str(PublicKey[1]).rstrip('\n'))

	fo.close()
	return 0

# only executed if not imported
if __name__ == "__main__":
	makeKeys()