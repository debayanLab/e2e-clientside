import helper

#
# Encrypt a message using public key
#
def encrypt():
	# open up our plaintext
	fo = open("plaintext.txt", "r")
	plaintext = fo.read().rstrip('\n')
	fo.close()

	# Calculate required size of m
	size = int(helper.keysize/8)
	
	if (len(plaintext) > size):
		print ("File too large!")
		return -1

	# Extract our Public key of the form (e, n)
	PublicKey = tuple(open("public_key.txt", "r"))
	key = int(PublicKey[0])
	n = int(PublicKey[1])

	# m = [hex(ord(x.encode())) for x in plaintext]
	m = int.from_bytes(plaintext.encode('utf-8'), byteorder='big')

	# Encrypt plaintext using formula
	# c = m^e mod n
	ciphertext = helper.modexp(m, key, n)

	fo = open("ciphertext.txt", "w")
	fo.write(str(ciphertext).rstrip('\n'))
	fo.close()
	
	return 0

# only executed if not imported
if __name__ == "__main__":
	encrypt()