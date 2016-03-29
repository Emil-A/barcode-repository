import unittest
from scanner import add_storage
from scanner import remove_storage


class TestScanner(unittest.TestCase):

    def setUp(self):
        pass

    def test_insert_new(self):
        self.assertEqual( addStorage("065633279315"), True)

    def test_wrong_scan(self):
        self.assertEqual( addStorage("Blah"), False)

 	def test_remove_exist(self):
        self.assertEqual( addStorage("065633279315"), True)

    def test_remove_nonexist(self):
        self.assertEqual( addStorage("Blah"), False)

if __name__ == '__main__':
    unittest.main()